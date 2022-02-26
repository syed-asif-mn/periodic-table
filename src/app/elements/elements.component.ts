import { Component } from '@angular/core';
import { of } from 'rxjs';
import ElementsData from '../elements/elements.json';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})

export class ElementsComponent {
  details1: string;
  details2: string;
  details3: string;
  symbol: string;
  ElementBgColor: string;
  filterButtonText: string;
  selectedIndex: number;
  firstClick: boolean;
  elements: any;
  searchText: string;

  constructor() {
    this.elements = of(ElementsData);
    this.filterButtonText = "Show Filters";
  }

  elementDetails(i: number) {
    //Get clicked element's data. Data is divided for clear representation
    let details = (JSON.stringify(ElementsData[i]).replace(/["{}]/g, "").replace(/,/g, "\n").replace(/_/g, " ").replace(/:/g, ": "));
    this.details1 = details.substring(0, details.indexOf("Atomic Radius"));
    this.details2 = details.substring(details.indexOf("Atomic Radius"), details.indexOf("Bonding Type"));
    this.details3 = details.substring(details.indexOf("Bonding Type"));

    this.symbol = ElementsData[i].Symbol;
    this.ElementBgColor = "#" + ElementsData[i].cpk_Hex_Color;

    //Used to highlight the selected element
    this.selectedIndex = i;

    //Show element details
    document.getElementById("elementDetails").classList.add("show");

    //Generate dynamic background color when element is selected
    document.getElementById("container").style.background = this.generateBgColor();

  }

  elementInfo(text: string) {
    var elementFound = false;
    text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    ElementsData.forEach(element => {
      if (element.Name == text || element.Symbol == text) {
        this.elementDetails(element.Atomic_Number - 1);
        elementFound = true;
      }
    })
    if (!elementFound) {
      alert(`No element with Name/Symbol ${text} found. Please try again.`)
    }
  }

  //Toggle element filters and highlight filter
  toggleFilter() {
    if (this.firstClick == false)
      document.querySelectorAll(".elements").forEach(e => { e.classList.toggle("normalize") });
    document.getElementById("elementsFilter").classList.toggle("show");
    this.filterButtonText = this.filterButtonText == "Show Filters" ? "Hide Filters" : "Show Filters";
    this.firstClick = false;
  }

  //Highlight elements when suitable filter is applied
  applyFilter(key: string, value: string) {
    var button = value.toLowerCase().replace(/ /g, "_");
    this.ElementBgColor = '';

    if (document.getElementById(button).style.background == '')
      this.ElementBgColor = this.generateBgColor();

    document.getElementById(button).style.background = this.ElementBgColor;

    ElementsData.forEach(element => {
      if ([key, value].every(term => JSON.stringify(element).includes(term)))
        document.getElementsByName(element.Symbol)[0].parentElement.style.background = this.ElementBgColor;
    })
  }

  //Random gradient generator
  generateBgColor() {
    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    var gradient = "linear-gradient(" + Math.round(Math.random() * 360) + "deg, " + populate('#') + ", " + populate('#') + ")";
    return gradient;

    function populate(a) {
      for (var i = 0; i < 6; i++)
        a += hexValues[Math.round(Math.random() * 14)];
      return a;
    }
  }
}

