import { Injectable } from '@angular/core';
import { MOCK_MESSAGES } from '../mock/mock-data';

export type Periodo = '7d' | '3m' | '6m';

const COLOR_POR_AGENTE: Record<string, string> = {
  pm: '#C9A227',
  fe: '#6B9E68',
  be: '#4A8AC9',
  qa: '#C96B6B',
  di: '#9B7A4A',
};

@Injectable({ providedIn: 'root' })
export class StatsService {
  periodoActual: Periodo = '7d';

  private filtrarMsgByPeriodo() {
    const ahora = new Date();
    const desde = new Date();

    if (this.periodoActual === '7d') {
      desde.setDate(ahora.getDate() - 7);
    } else if (this.periodoActual === '3m') {
      desde.setMonth(ahora.getMonth() - 3);
    } else if (this.periodoActual === '6m') {
      desde.setMonth(ahora.getMonth() - 6);
    }

    // Normalizar a inicio del día para evitar excluir mensajes por diferencia de horas
    desde.setHours(0, 0, 0, 0);

    return MOCK_MESSAGES.filter((m) => m.timeStamp >= desde);
  }

  // Cuenta cuántos mensajes ha enviado cada agente
  getActividadPorAgente() {
    const contador: Record<string, number> = {};
    const mensajesFiltrados = this.filtrarMsgByPeriodo();

    mensajesFiltrados.forEach((m) => {
      if (m.from === 'us') return;
      contador[m.from] = (contador[m.from] ?? 0) + 1;
    });

    const agentes = Object.keys(contador);

    const data = agentes.map((id) => ({
      value: contador[id],
      name: id.toUpperCase(),
      itemStyle: { color: COLOR_POR_AGENTE[id] ?? '#888' },
    }));

    // 3 — devolvemos el objeto para ECharts
    return {
      tooltip: { trigger: 'axis', formatter: '{b}: {c} mensajes' }, // item, axis para barras o none
      grid: { left: 40, right: 20, top: 20, bottom: 20 },
      xAxis: {
        type: 'category',
        data: agentes,
        axisLabel: { color: '#3D3020', fontSize: 11 },
        axisLine: { lineStyle: { color: '#888' } },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#888' } },
        splitLine: { lineStyle: { color: '#eee' } },
        axisLabel: { color: '#3D3020', fontSize: 11 },
      },
      series: [
        {
          type: 'bar',
          name: 'Mensajes',
          data,
          barWidth: '50%',
          label: { show: true, position: 'top', formatter: '{c}', color: '#3D3020', fontSize: 11 },
        },
      ],
    };
  }

  // Público vs privado
  getProporcionVisibilidad() {
    const mensajesFiltrados = this.filtrarMsgByPeriodo();
    const publicos = mensajesFiltrados.filter((m) => m.visibility === 'public').length;
    const privados = mensajesFiltrados.filter((m) => m.visibility === 'private').length;

    // ECharts para donut espera un array de { name, value }
    return {
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: {
        orient: 'vertical',
        left: '2%',
        top: 'center',
        textStyle: { color: '#9B7A4A', fontSize: 11 },
        icon: 'circle',
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '55%'],
          center: ['65%', '50%'],
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{d}%',
            fontSize: 11,
            color: '#3D3020',
          },
          data: [
            { name: 'Público', value: publicos, itemStyle: { color: '#6B9E68' } },
            { name: 'Privado', value: privados, itemStyle: { color: '#C9A227' } },
          ],
        },
      ],
    };
  }
}
