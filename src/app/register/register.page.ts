import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  pasien : any = {};
  jenis_kelamin : any;
  pekerjaan : any;
  pendidikan : any;
  agama : any;
  status_kawin : any;
  master_data: any;
  umur: any;
  disabled_btn : boolean = true;

  url : any = `${environment.api_url}`;

  constructor( private http : HttpClient,
               public navCtrl : NavController,
               public alert : AlertController,
             ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.http.get(this.url + 'master-ref').subscribe((response) => {
        this.jenis_kelamin = response['jenis_kelamin'];
        this.pekerjaan = response['pekerjaan'];
        this.pendidikan = response['pendidikan'];
        this.agama = response['agama'];
        this.status_kawin = response['status_kawin'];
    });
  }

  onInput(ev){
    if(this.pasien.nama && this.pasien.umur && this.pasien.jenis_kelamin && this.pasien.pekerjaan && this.pasien.pendidikan && this.pasien.statuspk && this.pasien.agama){
      return this.disabled_btn = false;
    }

    return this.disabled_btn = true;
  }

  save() {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'applicatiobn/json'
    });

    let data = {
      'nama': this.pasien.nama,
      'umur': this.pasien.umur,
      'jenis_kelamin_id': this.pasien.jenis_kelamin,
      'pekerjaan_id': this.pasien.pekerjaan,
      'pendidikan_id': this.pasien.pendidikan,
      'status_perkawinan_id': this.pasien.statuspk,
      'agama_id': this.pasien.agama
    };

    this.http.post(this.url + 'pasien/add', data, { headers: headers })
      .subscribe(data => {
        if (data['success']) {
          this.navCtrl.navigateRoot(['/list', data['data']['id']]);
        } else {
          this.presentAlert('Tidak dapat memproses permintaan', 'Terdapat Kesalahan Saat Menyimpan data');
        }
      }, err => {
        console.log(err);
        this.presentAlert('Tidak dapat memproses permintaan', 'Terdapat Kesalahan Saat Menyimpan data');
      });
  }


  async presentAlert(header, message) {
    const alert = await this.alert.create({
      subHeader: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
