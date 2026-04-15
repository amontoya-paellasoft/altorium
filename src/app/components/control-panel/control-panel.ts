import { Component, inject } from '@angular/core';
import { WorkspaceService } from '../../services/workspace-service';
import { SimulationService } from '../../services/simulation-service';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  templateUrl: './control-panel.html',
  styleUrl: './control-panel.css'
})
export class ControlPanel {
  ws: WorkspaceService = inject(WorkspaceService);
  private simulationServ: SimulationService = inject(SimulationService);

  reiniciar(): void {
    this.simulationServ.reiniciar();
    this.ws.reiniciar();
  }
}
