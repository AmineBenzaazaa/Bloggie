import auth from './auth';
import newsApi from '../stores/newsApi';
import nyTimes from '../stores/nytimes';
import guardian from '../stores/guardian';

const rootReducer = { auth, newsApi, nyTimes, guardian }

export default rootReducer