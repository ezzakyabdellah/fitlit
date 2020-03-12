import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Insomnia } from '@ionic-native/insomnia';




import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TrainingPage } from '../pages/training/training';
import { WorkoutTimerPage } from '../pages/workout-timer/workout-timer';
import { TrackerPage } from '../pages/tracker/tracker';
import { RepportsPage } from '../pages/repports/repports';
import { ReminderPage } from '../pages/reminder/reminder';
import { SettingsPage } from '../pages/settings/settings';
import { WorkoutFinishedPage } from '../pages/workout-finished/workout-finished';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar'
import { ProgressBar1Component } from '../components/progress-bar1/progress-bar1'
import { BmiComponent } from '../components/bmi/bmi';

// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DatasetProvider } from '../providers/dataset/dataset'; 
import { StorageProvider } from '../providers/storage/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { DbProvider } from '../providers/db/db';
import { BmiProvider } from '../providers/bmi/bmi';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TrainingPage,
    WorkoutTimerPage,
    TrackerPage,
    RepportsPage,
    ReminderPage,
    SettingsPage,
    WorkoutFinishedPage,
    ProgressBarComponent,
    ProgressBar1Component,
    BmiComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),ChartsModule,HttpModule,HttpClientModule,
    // Specify ng-circle-progress as an import
    IonicStorageModule.forRoot(),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 5,
      outerStrokeColor: "#ef5354", 
      animationDuration: 300,
      outerStrokeLinecap: 'butt',
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TrainingPage,
    WorkoutTimerPage,
    TrackerPage,
    RepportsPage,
    ReminderPage,
    SettingsPage,
    WorkoutFinishedPage,
  ],
  providers: [
    Insomnia,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatasetProvider,
    StorageProvider,
    SQLitePorter,
    SQLite,
    DbProvider,
    BmiProvider,
  ]
})
export class AppModule {}
