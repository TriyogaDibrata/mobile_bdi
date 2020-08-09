import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public gejala: any;
  public getValue : any[] = [];
  public no: any = 0;
  public answer: any = 0;
  selectedGejala : any;
  options : any = [];
  option : any = [];
  total : any;
  user_id : any;
  disabled_btn : boolean = true;

  url : any = `${environment.api_url}`;

  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private http : HttpClient,
              private route : ActivatedRoute,
              public navCtrl : NavController,
              public alert : AlertController,
              public toast : ToastController) {

  }

  ngOnInit(){

  }

  ionViewWillEnter() {

    this.user_id = this.route.snapshot.paramMap.get('id');

    this.http.get(this.url + 'gejala').subscribe((response) => {
        // console.log(data.data);
        this.gejala = response['data'];
        console.log(this.gejala.length);
    });
  }

  onInput(ev){
    if(this.options.length >= (this.gejala.length + 1)){
      return this.disabled_btn = false;
    }

    return this.disabled_btn = true;
  }

  select(no, answer){
    console.log(no, answer);
    this.no = no;
    this.answer = answer;
  }

  geta(){
    for (var i = 1; i < this.options.length; i++)
    {
      this.option.push(this.options[i]);
    }
    this.itemChecks();
  }

  itemChecks(){
    var sum = 0;
    for (let opt of this.option){
      sum += Number(opt);
      this.total = sum;
    }

    console.log(this.total);
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'applicatiobn/json'
    });

    let data = {
      'pasien_id': this.user_id,
      'hasil': this.total,
    };

    this.http.post(this.url + 'pasien/hasil/add', data, { headers: headers })
      .subscribe(data => {
        if (data['success']) {
          this.presentToast('Data Berhasil Disimpan');
          this.navCtrl.navigateRoot(['/hasil', data['data']['id']]);
        } else {
          this.presentAlert('Gagal', 'Terdapat Kesalahan Saat Menyimpan data');
        }
      }, err => {
        console.log(err);
        this.presentAlert('Gagal', 'Terdapat Kesalahan Saat Menyimpan data');
      });
  }

  async presentAlert(header, message) {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  
}
