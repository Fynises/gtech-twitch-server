export default interface LoginRequest {
  code: string;
  scope: string;
  state: string;
}
