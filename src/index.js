import './style.scss';
import '../assets/weather-icons-master/css/weather-icons.min.css';

import * as ApiFn from './api';
import * as DomFn from './dom';
import * as Helper from './helper';
DomFn.renderTemplate();

ApiFn.initApi('lucknow');
