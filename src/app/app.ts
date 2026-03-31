import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/structure/header/header';
import { AgentMap } from './components/agent-map/agent-map';
import { Chat } from './components/chat/chat';
import { ControlPanel } from './components/control-panel/control-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, AgentMap, Chat, ControlPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Glitch');
}
