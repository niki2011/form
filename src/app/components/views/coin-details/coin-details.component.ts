import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CoinDetailsService } from 'src/app/services/coin-details.service';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatePhone } from 'src/app/validators/phone.validator';
import { ValidateString } from 'src/app/validators/string.validator';
import { ValidateMessage } from 'src/app/validators/message.validator';

import { CoinDetails } from 'src/app/models/coinDetails';

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private coinDetailsService: CoinDetailsService,
    private formBuilder: FormBuilder
  ) { }

  faultSubmitForm = new FormGroup({
    name: new FormControl(''),
    id: new FormControl(''),
    symbol: new FormControl('')
  });

  formErrorMsg = '';

  ngOnInit(): void {
    this.faultSubmitForm = this.formBuilder.group({
      name: ['', [Validators.required, ValidateString]],
      id: ['', [Validators.required, ValidateString]],
      symbol: ['', [Validators.required, ValidateString]],
      // phoneNumber: ['', [Validators.required, ValidatePhone]],
    });
    this.route.params.subscribe(params => {
      console.log('params.id:  ', params.id); // --> Name must match wanted parameter
      this.coinDetailsService.getCoinDetails(params.id).subscribe(
        (coin: CoinDetails) => {
          console.log('coinDetailsService11:  ', coin);
          this.formErrorMsg = '';
          this.faultSubmitForm.setValue(coin);

        },
        error => {
          console.log('coin-details.component coinDetailsService', error);
        });
    });

  }

  onSubmit() {

    const coin = {
      id: this.faultSubmitForm.value.id.toString().trim(),
      symbol: this.faultSubmitForm.value.symbol.toString().trim(),
      name: this.faultSubmitForm.value.name.toString().trim(),
    };
    console.log('submit');
    console.log(coin);

    this.coinDetailsService.submitFormFaultReport(coin).subscribe(res => {
      console.log('success');
    }, err => {
      console.log('submit error');
      this.formErrorMsg = 'Submit error';
      // console.error(err);
    }
    );

  }

  // get phoneNumber() { return this.faultSubmitForm.get('phoneNumber'); }
  get name() { return this.faultSubmitForm.get('name'); }
  get id() { return this.faultSubmitForm.get('id'); }
  get symbol() { return this.faultSubmitForm.get('symbol'); }


}
