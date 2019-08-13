import React, {Component} from 'react';
import ListDesenv from './components/ListDesenv'
import {Container} from '@material-ui/core'

class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div> 
                
                    <Container  maxWidth="xl">
                        <ListDesenv />
                    </Container>
                
            </div>
        );
    }

}

export default App;
