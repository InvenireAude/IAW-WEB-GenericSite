import { Component, OnInit } from '@angular/core';
import { AfterContentInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-ias-code',
  templateUrl: './ias-code.component.html',
  styleUrls: ['./ias-code.component.css']
})
export class IasCodeComponent implements OnInit, AfterContentInit {


    public  node: string;
    public  program = {lines: []};

    constructor(private elementRef: ElementRef) { }

    ngOnInit() {

      // console.log(this.textElement.nativeElement.textContent);

    }

    ngAfterContentInit() {
      console.log(this.elementRef.nativeElement.firstChild.textContent);
      const text: string = this.elementRef.nativeElement.firstChild.textContent;

      this.program.lines = text.split(' ');
      // this.elementRef.nativeElement.innerHTML = '<b>' + text + '</b>';
    }

  }
