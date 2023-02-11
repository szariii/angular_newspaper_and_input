import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewspaperDataService {
  arrayWithInfoOfNewspaper: Array<NewspaperInfo> = [];
  arrayWithYears: Array<String> = [];

  constructor() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        showResult(xhttp.responseXML as Document);
      }
    };
    xhttp.open('GET', '../assets/czasopisma.xml', true);
    xhttp.send();

    const showResult = async (xml: Document) => {
      const path = `//zmienne/*`;
      if (xml.evaluate) {
        let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
        let result = nodes.iterateNext();
        while (result) {
          let newspaperInfo = result.childNodes[0].parentElement as HTMLElement;
          let src =
            'http://atarionline.pl/biblioteka/czasopisma/img/' +
            newspaperInfo.getElementsByTagName('src')[0].innerHTML;
          let klik = newspaperInfo.getElementsByTagName('klik')[0].innerHTML;

          let obj: NewspaperInfo = {
            name: klik,
            img: src,
          };

          this.arrayWithInfoOfNewspaper.push(obj);
          result = nodes.iterateNext();
        }
      }
    };
  }

  async getYearsOfNewspapers(name: string) {
    const getPostagePrice = async () => {
      let doc: Document = new Document();
      await fetch('../assets/czasopisma.xml')
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then((data) => (doc = data));

      return doc;
    };

    let xml = await getPostagePrice();
    const path = `//lata/${name}`;
    let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
    let array: Array<string> = [];
    let result = nodes.iterateNext();
    while (result) {
      let html = result.childNodes[0].parentElement as HTMLElement;
      array = html.innerHTML.split(',');
      result = nodes.iterateNext();
    }
    array.push('Wszystkie');
    return array;
  }

  async getNewspapersInSelectedYear(name: string, year: string) {
    const getPostagePrice = async () => {
      let doc: Document = new Document();
      await fetch('../assets/czasopisma.xml')
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then((data) => (doc = data));

      return doc;
    };

    let xml = await getPostagePrice();
    const path = `//czasopisma/${name}/*`;
    let nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
    let array: Array<NewspaperFullInfo> = [];
    let result = nodes.iterateNext();

    while (result) {
      if (result.childNodes.length !== 0) {
        let html = result.childNodes[0].parentElement as HTMLElement;

        if (year === html.getAttribute('rok') || year === 'Wszystkie') {
          //if(){
          let obj: NewspaperFullInfo = {
            nazwa: html.getElementsByTagName('nazwa')[0].innerHTML,
            numer: html.getElementsByTagName('numer')[0].innerHTML,
            wydawca: html.getElementsByTagName('wydawca')[0].innerHTML,
            format: html.getElementsByTagName('format')[0].innerHTML,
            stron: html.getElementsByTagName('stron')[0].innerHTML,
            miniaturka: html.getElementsByTagName('miniaturka')[0].innerHTML,
            plik: html.getElementsByTagName('plik')[0].innerHTML,
            skan: html.getElementsByTagName('skan')[0].innerHTML,
            przetworzenie:
              html.getElementsByTagName('przetworzenie')[0].innerHTML,
            podeslal: html.getElementsByTagName('podeslal')[0].innerHTML,
          };
          array.push(obj);
        }
      }

      result = nodes.iterateNext();
    }

    return array;
  }
}

interface NewspaperInfo {
  name: string;
  img: string;
}

interface NewspaperFullInfo {
  nazwa: string;
  numer: string;
  wydawca: string;
  format: string;
  stron: string;
  miniaturka: string;
  plik: string;
  skan: string;
  przetworzenie: string;
  podeslal: string;
}
