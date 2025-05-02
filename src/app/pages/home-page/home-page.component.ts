import { afterNextRender, afterRender, Component, effect, OnChanges, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = (...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(', ')}`,
    'color: #bada55');
}

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnChanges {

  //El implements es importante para asegurarnos que esté el ciclo de vida implementado correctamente ya que si no angular se quejará,
  //pero no es obligatorio

  traditionalProperty = 'Fernando';
  signalProperty = signal('Fernando');

  constructor(){
    log('constructor llamado');

    setTimeout(() => {
      // this.traditionalProperty = 'Pedro'; //Como estamos en zoneless esto ya no cambia el texto en la plantilla, aunque cuando se llama tambien a la signal si ya que detecta cambios y los aplica a todos, deberiamos trabajar solo con señales para evitar falsos positivos
      // this.signalProperty.set('Juan Carlos');
      // console.log('hecho');
    }, 2000);

  }

  changeTraditional(){
    this.traditionalProperty = 'Fernando Herrera';
  }

  changeSignal(){
    this.signalProperty.set('Fernando Herrera');
  }

  basicEffect = effect((onCleanup) => {
    log('effect', 'Dispara efectos secundarios');
    onCleanup(() => {
      log('onCleanup', 'Se ejecuta cuando el efecto se va a destruir');
    });
  })

  ngOnInit(){
    log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.");
  }

  ngOnChanges(){
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }

  ngDoCheck(){
    log('ngDoCheck', "Runs every time this component is checked for changes.");
  }

  ngAfterContentInit(){
    log('ngAfterContentInit', "Runs once after the component's content has been initialized.");
  }

  ngAfterContentChecked(){
    log('ngAfterContentChecked', "Runs every time this component content has been checked for changes.");
  }

  ngAfterViewInit(){
    log('ngAfterViewInit', "Runs once after the component's view has been initialized.");
  }

  ngAfterViewChecked(){
    log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.");
  }

  ngOnDestroy(){
    log('ngOnDestroy', "Runs once before the component is destroyed.");
  }

  afterNextRenderEffect = afterNextRender(() => {
    log('afterNextRender', "Runs once the next time that all components have been rendered to the DOM.");
  });

  afterRenderEffect = afterRender(() => {
    log('afterRender', "Runs every time all components have been rendered to the DOM.");
  });

}
