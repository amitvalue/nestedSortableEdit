import testReducer from './testReducer';
const firstTestApp = (currentState = {}, action) => {
    return {
        testReducer: testReducer(currentState.testReducer, action)
    }
};

export default firstTestApp;
