import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailComponent } from "app/main/apps/detail/detail.component";
import { DetailService } from "app/main/apps/detail/detail.service";
import { ListService } from "./list/list.service";
import { ListComponent } from "./list/list.component";
import { RoleGuard } from "app/guards/role.guard";


const routes: Routes = [
  {
      path: "dashboard",
      loadChildren:
          "./dashboards/analytics/analytics.module#AnalyticsDashboardModule",
  },
  {
      path: "companies",
      component: ListComponent,
      resolve: {
          data: ListService,
      },
      data: {
          url: "/api/company",
          model: {
              id: true,
              image: true,
              name: true,
              sector: true,
              activity: true,
              staffcount: true,
          },
          modelName: "Company",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "products",
      component: ListComponent,
      resolve: {
          data: ListService,
      },
      data: {
          url: "/api/product",
          model: {
              id: true,
              image: true,
              name: true,
              description: true,
              category: true,
              price: true,
          },
          modelName: "Product",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "projects",
      component: ListComponent,
      resolve: {
          data: ListService,
      },
      data: {
          url: "/api/project",
          model: {
              id: true,
              image: true,
              name: true,
              territories: true,
              active: true,
          },
          modelName: "Project",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "presentations",
      component: ListComponent,
      resolve: {
          data: ListService,
      },
      data: {
          url: "/api/presentation",
          model: {
              id: true,
              name: true,
              territories: true,
              creator: true,
          },
          modelName: "Presentation",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "medias",
      component: ListComponent,
      resolve: {
          data: ListService,
      },
      data: {
          url: "/api/media",
          model: {
              id: true,
              name: true,
              description: true,
              category: true,
              link: true,
          },
          modelName: "Media",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "references",
      component: ListComponent,
      resolve: {
          data: ListService,
      },
      data: {
          url: "/api/referance",
          model: {
              id: true,
              name: true,
              description: true,
          },
          modelName: "Reference",
      },
      canActivate: [RoleGuard],
  },

  {
      path: "company/:id",
      component: DetailComponent,
      resolve: {
          data: DetailService,
      },
      data: {
          url: "/api/company",
          model: {
              id: true,
              image: true,
              name: true,
              email: true,
              password: true,
              website: true,
              address: true,
              PostalCode: true,
              city: true,
              telephone: true,
              sector: true,
              staffcount: true,
              activity: true,
              subPeriod: true,
              databaseSize: true,
              supportType: true,
              slaType: true,
              employee: true,
              active: true,
          },
          modelName: "Company",
          listName: "companies",
      },
      canActivate: [RoleGuard],
  },

  {
      path: "product/:id",
      component: DetailComponent,
      resolve: {
          data: DetailService,
      },
      data: {
          url: "/api/product",
          model: {
              id: true,
              image: true,
              name: true,
              description: true,
              category: true,
              price: true,
              project: true,
          },
          modelName: "Product",
          listName: "products",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "project/:id",
      component: DetailComponent,
      resolve: {
          data: DetailService,
      },
      data: {
          url: "/api/project",
          model: {
              id: true,
              image: true,
              name: true,
              territories: true,
              creator: true,
              active: true,
          },
          modelName: "Project",
          listName: "projects",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "presentation/:id",
      component: DetailComponent,
      resolve: {
          data: DetailService,
      },
      data: {
          url: "/api/presentation",
          model: {
              id: true,
              name: true,
              territories: true,
              creator: true,
              project: true,
              media: true,
          },
          modelName: "Presentation",
          listName: "presentations",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "media/:id",
      component: DetailComponent,
      resolve: {
          data: DetailService,
      },
      data: {
          url: "/api/media",
          model: {
              id: true,
              name: true,
              description: true,
              category: true,
              link: true,
          },
          modelName: "Media",
          listName: "medias",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "reference/:id",
      component: DetailComponent,
      resolve: {
          data: DetailService,
      },
      data: {
          url: "/api/referance",
          model: {
              id: true,
              name: true,
              description: true,
          },
          modelName: "Reference",
          listName: "references",
      },
      canActivate: [RoleGuard],
  },
  {
      path: "**",
      pathMatch: "full",
      redirectTo: "dashboard",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
