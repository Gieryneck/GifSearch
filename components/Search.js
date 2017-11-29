Search = React.createClass({

    getInitialState() {

        return {

            searchingText: ''
        };
    },


    handleChange: function (event) {

        var searchingText = event.target.value;
        /*
        Każda zmiana generuje pewne zdarzenie. Wciskanie klawiszy na
         klawiaturze to właśnie przykład takiego zdarzenia (event).
          Do wartości tego zdarzenia możemy się dostać wchodząc do 
          klucza target, a następnie do klucza value. 
 
          The target event property returns the element that triggered the event.
          The target property gets the element on which the event originally occurred,
           opposed to the currentTarget property, which always refers to the element whose 
           event listener triggered the event.
        */
        this.setState({

            searchingText: searchingText
        });


        if (searchingText.length > 2) {

            this.props.onSearch(searchingText); // jestli mamy trzy wpisane litry szukamy gifa
        }
    },

    handleKeyUp: function (event) {

        if (event.keyCode === 13) {
            // keyCode === 13 to "Enter", a wiec na odcisniecie klawisza sprawdzamy czy ten klawisz nie byl Enterem
            // jesli byl, to ponownie uruchamiamy szukanie gifa
            this.props.onSearch(this.state.searchingText) 
        }
    },


    render: function () {

        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };

        return <input
            type='text'
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            placeholder='Tutaj wpisz wyszukiwaną frazę'
            style={styles}
            value={this.state.searchingText}
        /* wartość value trzyma wartość stanu, a nie tego co wpisuje użytkownik! 
        Poki co pisanie na stronie w inpucie nie zmienia value, bo nie zmienia stanu searchingText
        Musimy to zaimplementowac!
         */
        />
    },
});