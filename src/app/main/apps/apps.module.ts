import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

import { AbilityModule } from "@casl/angular";
import { Ability, PureAbility } from "@casl/ability";

import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AgmCoreModule } from "@agm/core";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";

import { DetailComponent } from "app/main/apps/detail/detail.component";
import { DetailService } from "app/main/apps/detail/detail.service";
import { ListService } from "./list/list.service";
import { ListComponent } from "./list/list.component";

import {AppsRoutingModule} from './apps-routing.module'



@NgModule({
    declarations: [ListComponent, DetailComponent],
    imports: [
        CommonModule,
        AppsRoutingModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8",
        }),

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers: [
        ListService,
        DetailService
    ],
})
export class AppsModule {}
