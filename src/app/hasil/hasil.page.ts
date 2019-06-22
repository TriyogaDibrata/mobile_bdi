import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-hasil',
  templateUrl: './hasil.page.html',
  styleUrls: ['./hasil.page.scss'],
})
export class HasilPage implements OnInit {

  hasil_id : any;
  data : any;

  constructor(private http : HttpClient,
    private route : ActivatedRoute,
    public navCtrl : NavController,
    public alert : AlertController,
    public toast : ToastController) {

}

  ngOnInit() {
    this.hasil_id = this.route.snapshot.paramMap.get('id');

    this.http.get('http://localhost:8000/api/hasil/'+this.hasil_id).subscribe((response) => {
        console.log(response['data']);
        this.data = response['data'];
        
        // this.gejala = response['data'];
        // console.log(this.gejala.length);
    });
  }

}
