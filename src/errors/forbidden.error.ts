import { ServerErr } from './server.error';

export class ForbiddenErr extends ServerErr {
    public code = 403;
}