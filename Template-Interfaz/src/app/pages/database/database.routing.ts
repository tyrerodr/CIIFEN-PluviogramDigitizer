import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatabaseComponent } from './database.component';
import { StationComponent } from '../station/station.component';

const childRoutes: Routes = [
    {
        path: '',
        component: DatabaseComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
