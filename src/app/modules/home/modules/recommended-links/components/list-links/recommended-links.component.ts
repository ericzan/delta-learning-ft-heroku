import { Component, OnInit } from '@angular/core';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';


@Component({
  selector: 'zan-recommended-links',
  templateUrl: './recommended-links.component.html',
  styleUrls: ['./recommended-links.component.scss']
})
export class RecommendedLinksComponent implements OnInit{

  products: Array<{ logo:string,name: string, link: string, texttoshow: string ,imagelink:string}> = [];


  ngOnInit(): void {
    let _text ="Marcus Carter es un experto en fonética.  \nEste video tiene duración de 14 minutos, y explicará cada uno de los sonidos del idioma Inglés, es importante que lo escuches tantas veces como necesites.\nRecuerda que los sonidos nuevos no son identificados por nuestro cerebro, por eso debemos “practicarlos”  para que nuestro oído y cerebro aprendan a identificarlos y así poderlos usar."
    let _text2="Este portal no solo es gratuito, también es fabuloso por que no solo aprenderemos Inglés, a través de sus audios conoceremos cultura, costumbres e historia de otros países, leyendas, alimentos, salud, y otros temas que podrán parecerte interesantes.\n\nSi eres principiante, te recomendamos disminuir la velocidad de reproducción a la que consideres apropiada, y aprovechando que tenemos el texto del audio practicaremos la técnica de ‘hacer sombra’, esto se refiere a escuchar y leer al mismo tiempo en voz alta tan fuerte para que puedas escucharte. Puedes prácticar esto primero escuchando y leyendo en silencio, y repetir el ejercicio pero ahora ‘leyendo en voz alta’. A medida que enriquezcas tu vocabulario estos audios te parecerán grandiosos. \n\nEs opcional subscribirte, también puedes bajar su App."

    this.products.push({logo:"",name:"carter method",link:"https://www.youtube.com/watch?v=I2SaZnEjmZw",texttoshow:_text,imagelink:"https://cartermethod1.b-cdn.net/wp-content/uploads/2021/06/Big-logo-1-1536x527.png"});

     this.products.push({logo:"",name:"Spotlight English Learning",link:"https://spotlightenglish.com/",texttoshow:_text2,
     imagelink:"https://spotlightenglish.com/wp-content/uploads/2020/01/LogoIcon.png.webp"});


  }



}
