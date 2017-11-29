App = React.createClass({


    getInitialState: function() {

        return {

            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {  // 1.
        
                this.setState({
        
                    loading: true  // 2.
                });
        
                this.getGif(searchingText, function (gif) {  // 3.
                    this.setState({  // 4
                        loading: false,  // a
                        gif: gif,  // b
                        searchingText: searchingText  // c
                    });
                }.bind(this));
            },
        
            /*
            bind(this) aby zachować kontekst.
             Przekazywana do metody getGif funkcja wskazuje na coś innego niż komponent App,
              dlatego trzeba posłużyć się pewnym obejściem (metoda bind), które zachowa odpowiedni 
              kontekst.
            */
        
        
            /*
            Algorytm postępowania dla tej metody jest następujący:
        
        1 pobierz na wejściu wpisywany tekst,
        2 zasygnalizuj, że zaczął się proces ładowania,
        3 Rozpocznij pobieranie gifa,
        4 Na zakończenie pobierania:
        -przestań sygnalizować ładowanie,
        -ustaw nowego gifa z wyniku pobierania,
        -ustaw nowy stan dla wyszukiwanego tekstu.
            */

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center', // myslnik/minus to w js odejmowanie, dlatego stosuje sie camelCase
            width: '90%'
        };

        return (

          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch ={this.handleSearch}/>
            <Gif 
                loading = {this.state.loading}
                url = {this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />
          </div>    
        );
    },


    getGif: function(searchingText, callback) {  // 1.
        var GIPHY_API_URL = 'http://api.giphy.com';
        var GIPHY_PUB_KEY = '1ltIITOSzL0g1i0q0c4SGpGfDnd1Pn1M';
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
        var xhr = new XMLHttpRequest();  // 3.
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
               var data = JSON.parse(xhr.responseText).data; // 4.
                var gif = {  // 5.
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);  // 6.
            }
        };
        xhr.send();
    },
});




