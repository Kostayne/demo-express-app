import { ServerErr } from './server.error';

export class NotFoundErr extends ServerErr {
    public code = 404;
}