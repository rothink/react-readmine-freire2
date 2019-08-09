import React, {Component} from 'react';
import ListDesenv from './components/ListDesenv'

class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div> 
                <div class="row">
                    <ListDesenv />
                </div>
            </div>
        );
    }

}

export default App;
