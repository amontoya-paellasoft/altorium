export interface Proyecto {
  id: string;
  domainName: string;
  companyId: string;
  domainUrl: string;
  projectType: 'ODOO' | 'SPRING_BOOT';
  projectStatus: 'CREATED' | 'INGESTING' | 'READY' | 'BLOCKED' | 'AUDITED' | 'ANALYZED' | 'PAUSED' | 'ARCHIVED';
  activeVersionId: number;
  inactiveFlag: boolean;
  createdAt: string;
  altImage?: string;
  alias?: string;
  repositoryConfig: {
    provider: 'GITHUB' | 'BITBUCKET';
    cloneUrl: string;
  };
}

export type ProyectoStatus = Proyecto['projectStatus'];
