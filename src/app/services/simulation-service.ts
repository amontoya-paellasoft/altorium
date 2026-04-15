import { inject, Injectable, NgZone } from '@angular/core';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  MOCK_MESSAGES,
  MOCK_REACCIONES_PUBLICAS,
  MOCK_USER_REACCIONES,
} from '../mock/mock-data';
import { MessageInterface } from '../models/message-interface';
import { ChatService } from './chat-service';

@Injectable({ providedIn: 'root' })
export class SimulationService {
  private chatServ: ChatService = inject(ChatService);
  private ngZone: NgZone = inject(NgZone);

  private simulacionPausada = false;
  private contadorInsistencia: Record<string, number> = {};
  private indiceActual = 0;

  private readonly mensajesOrdenados = [...MOCK_MESSAGES].sort(
    (a, b) => a.timeStamp.getTime() - b.timeStamp.getTime(),
  );

  private readonly USER_ID = 'us';

  // MÉTODOS PÚBLICOS

  iniciarSimulacion(): void {
    this.enviarSiguienteMensaje();
  }

  reiniciar(): void {
    this.indiceActual = 0;
    this.contadorInsistencia = {};
    this.simulacionPausada = false;
    this.chatServ.reiniciarEstado();
    this.iniciarSimulacion();
  }

  enviarMensajeUsuario(text: string, contexto: string): void {
    this.simulacionPausada = true;

    const esPrivado = contexto !== 'general';
    const convId = esPrivado ? this.chatServ.resolverConvId(contexto) : 'general';

    const msgUsuario: MessageInterface = {
      id: Date.now(),
      from: this.USER_ID,
      to: esPrivado ? contexto : 'all',
      visibility: esPrivado ? 'private' : 'public',
      text,
      timeStamp: new Date(),
    };
    this.chatServ.setMensajeActivo({ from: this.USER_ID, to: esPrivado ? contexto : 'all' });
    this.chatServ.agregarMensajeAConversacion(msgUsuario);

    if (esPrivado) {
      this.reaccionarEnPrivado(convId);
      setTimeout(() => {
        this.chatServ.setMensajeActivo(null);
        this.simulacionPausada = false;
        this.enviarSiguienteMensaje();
      }, 4000);
    } else {
      this.reaccionarEnPublico();
      setTimeout(() => {
        this.chatServ.setMensajeActivo(null);
        this.simulacionPausada = false;
        this.enviarSiguienteMensaje();
      }, 3500);
    }
  }

  // MÉTODOS PRIVADOS

  private enviarSiguienteMensaje(): void {
    if (this.simulacionPausada) return;
    if (this.indiceActual >= this.mensajesOrdenados.length) return;

    const original = this.mensajesOrdenados[this.indiceActual];
    const mensaje: MessageInterface = { ...original, text: '' };

    this.chatServ.agregarMensajeAConversacion(mensaje);
    this.indiceActual++;
    this.chatServ.setMensajeActivo({ from: original.from, to: original.to });
    this.escribirMensaje(mensaje, original.text, original.from, () => {
      setTimeout(() => this.enviarSiguienteMensaje(), this.obtenerDelay(original.from));
    });
  }

  private reaccionarEnPrivado(convId: string): void {
    const reacciones = MOCK_USER_REACCIONES[convId];
    if (!reacciones) return;

    const conv = this.chatServ.getConversacion(convId);
    if (!conv) return;

    const [agente1, agente2] = conv.participants;
    const veces = this.contadorInsistencia[convId] ?? 0;

    if (veces === 0) {
      const txt1 = reacciones.agente1[0];
      const txt2 = reacciones.agente2[0];
      setTimeout(() => this.inyectarMensaje(agente1, agente2, txt1, 'private', convId), 800);
      setTimeout(() => this.inyectarMensaje(agente2, agente1, txt2, 'private', convId), 2400);
    } else {
      const pool = reacciones.insistencia;
      const idx = Math.min(veces - 1, pool.length - 1);
      setTimeout(() => this.inyectarMensaje(agente1, agente2, pool[idx], 'private', convId), 800);
    }

    this.contadorInsistencia[convId] = veces + 1;
  }

  private reaccionarEnPublico(): void {
    const agentes = Object.keys(MOCK_REACCIONES_PUBLICAS);
    const agente = agentes[Math.floor(Math.random() * agentes.length)];
    const pool = MOCK_REACCIONES_PUBLICAS[agente];
    const txt = pool[Math.floor(Math.random() * pool.length)];
    setTimeout(() => this.inyectarMensaje(agente, 'all', txt, 'public', 'general'), 800);
  }

  private inyectarMensaje(
    from: string,
    to: string,
    text: string,
    visibility: 'public' | 'private',
    convId: string,
  ): void {
    const mensaje: MessageInterface = {
      id: Date.now() + Math.random(),
      from,
      to,
      visibility,
      text: '',
      timeStamp: new Date(),
    };

    this.chatServ.agregarMensajeAConversacion(mensaje);
    this.chatServ.setMensajeActivo({ from, to });
    this.ngZone.run(() => {
      interval(35)
        .pipe(
          map((i) => text.substring(0, i + 1)),
          take(text.length),
        )
        .subscribe({
          next: (t) => {
            mensaje.text = t;
            this.chatServ.emitirCambio();
          },
          complete: () => {
            setTimeout(() => this.chatServ.setMensajeActivo(null), 500);
          },
        });
    });
  }

  private escribirMensaje(
    mensaje: MessageInterface,
    textoCompleto: string,
    agentId: string,
    callback: () => void,
  ): void {
    this.ngZone.run(() => {
      interval(this.obtenerVelocidad(agentId))
        .pipe(
          map((i) => textoCompleto.substring(0, i + 1)),
          take(textoCompleto.length),
        )
        .subscribe({
          next: (texto) => {
            mensaje.text = texto;
            this.chatServ.emitirCambio();
          },
          complete: () => {
            setTimeout(() => {
              this.chatServ.setMensajeActivo(null);
              callback();
            }, 500);
          },
        });
    });
  }

  private obtenerVelocidad(agentId: string): number {
    const v: Record<string, number> = { pm: 40, fe: 25, be: 30, qa: 20, di: 35 };
    return v[agentId] ?? 30;
  }

  private obtenerDelay(agentId: string): number {
    const d: Record<string, number> = { pm: 1200, fe: 700, be: 900, qa: 600, di: 800 };
    return d[agentId] ?? 1000;
  }
}
