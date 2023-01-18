export class PostFields {
  id: string;
  profile: any;
  metadata: any;
  createdAt: string;

  constructor(id: string, profile: any, metadata: any, createdAt: string) {
    this.id = id;
    this.profile = profile;
    this.metadata = metadata;
    this.createdAt = createdAt;
  }
}
