import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', redirectTo: 'about', pathMatch: 'full' },
          
        ]
      }
];
