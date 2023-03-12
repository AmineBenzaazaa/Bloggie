import auth from './auth';
import newsApi from '../stores/newsApi';
import guardian from '../stores/guardian';

const rootReducer = { auth, newsApi, guardian }

export default rootReducer