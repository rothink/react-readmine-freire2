import React, {Component} from 'react';
import ListDesenv from './components/ListDesenv'

class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div> 
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <div class="">
                    <div class="row">
                        <ListDesenv />
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
