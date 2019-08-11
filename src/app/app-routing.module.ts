import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  {
    path: 'detail',
    loadChildren: './pages/detail/detail.module#DetailPageModule'
  },
  { path: 'form', loadChildren: './pages/form/form.module#FormPageModule' },
  { path: 'create-form', loadChildren: './pages/create-form/create-form.module#CreateFormPageModule' },
  { path: 'create-workflow', loadChildren: './pages/create-workflow/create-workflow.module#CreateWorkflowPageModule' },
  { path: 'form-table', loadChildren: './pages/form-table/form-table.module#FormTablePageModule' },
  { path: 'workflow-table', loadChildren: './pages/workflow-table/workflow-table.module#WorkflowTablePageModule' },
  { path: 'workflow-details', loadChildren: './pages/workflow-details/workflow-details.module#WorkflowDetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
