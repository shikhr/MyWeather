import './style.scss';

import * as ApiFn from './api';
import * as DomFn from './dom';
import * as Helper from './helper';
DomFn.renderTemplate();

ApiFn.initApi('lucknow');
