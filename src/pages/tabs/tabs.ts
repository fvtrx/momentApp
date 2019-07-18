import { Component } from "@angular/core";
import { HomePage } from "../home/home";
import { ProfilePage } from "../profile/profile";
import { BookingPage } from "../booking/booking";
// import { NavController } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root = HomePage;
  tab2Root = BookingPage;
  tab3Root = ProfilePage;
}
