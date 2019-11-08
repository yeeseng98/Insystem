import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'form', loadChildren: './pages/form/form.module#FormPageModule' },
  { path: 'create-form', loadChildren: './pages/create-form/create-form.module#CreateFormPageModule' },
  { path: 'create-workflow', loadChildren: './pages/create-workflow/create-workflow.module#CreateWorkflowPageModule' },
  { path: 'form-table', loadChildren: './pages/form-table/form-table.module#FormTablePageModule' },
  { path: 'workflow-table', loadChildren: './pages/workflow-table/workflow-table.module#WorkflowTablePageModule' },
  { path: 'workflow-details', loadChildren: './pages/workflow-details/workflow-details.module#WorkflowDetailsPageModule' },
  { path: 'assign-workflow', loadChildren: './pages/assign-workflow/assign-workflow.module#AssignWorkflowPageModule' },
  { path: 'workflow-selection', loadChildren: './pages/workflow-selection/workflow-selection.module#WorkflowSelectionPageModule' },
  { path: 'student-task-view', loadChildren: './pages/student-task-view/student-task-view.module#StudentTaskViewPageModule' },
  { path: 'file', loadChildren: './pages/file/file.module#FilePageModule' },
  { path: 'meeting-confirmation-request',
    loadChildren: './pages/meeting-confirmation-request/meeting-confirmation-request.module#MeetingConfirmationRequestPageModule' },
  { path: 'meeting-confirmation-approval',
    loadChildren: './pages/meeting-confirmation-approval/meeting-confirmation-approval.module#MeetingConfirmationApprovalPageModule' },
  { path: 'resource-table', loadChildren: './pages/resource-table/resource-table.module#ResourceTablePageModule' },
  { path: 'add-resource', loadChildren: './pages/add-resource/add-resource.module#AddResourcePageModule' },
  { path: 'authority-delegation', loadChildren: './pages/authority-delegation/authority-delegation.module#AuthorityDelegationPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'int-declaration', loadChildren: './pages/int-declaration/int-declaration.module#IntDeclarationPageModule' },
  { path: 'student-search', loadChildren: './pages/student-search/student-search.module#StudentSearchPageModule' },
  { path: 'company-approval', loadChildren: './pages/company-approval/company-approval.module#CompanyApprovalPageModule' },
  { path: 'intake-workflow-view', loadChildren: './pages/intake-workflow-view/intake-workflow-view.module#IntakeWorkflowViewPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
