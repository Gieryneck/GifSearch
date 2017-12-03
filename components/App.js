App = React.createClass({


    getInitialState: function() {

        return {

            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {  
        
                this.setState({
        
                    loading: true  
                });
        
                this.getGif(searchingText)
                        .then((response) => {
                            //console.log(response);
                            const data = JSON.parse(response).data; 
                            const gif = {  
                                url: data.fixed_width_downsampled_url,
                                sourceUrl: data.url
                            };
                            
                            this.setState({
                                loading: false,  
                                gif: gif,  
                                searchingText: searchingText
                            });
                        
                        })
                        .catch(error => console.log(error.statusText)); 
            
            },

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

/*
Zadanie polega na opakowaniu kodu pobierającego gifa w promise'a,
 a następnie wywołanie metody then w celu obsłużenia wyniku zapytania
*/

    getGif: function(searchingText) { 
    
        return new Promise(

            function(resolve, reject) {

                const GIPHY_API_URL = 'http://api.giphy.com';
                const GIPHY_PUB_KEY = '1ltIITOSzL0g1i0q0c4SGpGfDnd1Pn1M';
                const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
                const xhr = new XMLHttpRequest();

                xhr.onload = function() {
                    if (this.status === 200) {

                        resolve(this.responseText);

                    } else {

                        reject(new Error(this.statusText));
                    }
                };

                xhr.onerror = function () {

                    reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
                };
                xhr.open('GET', url);
                xhr.send();          
            }
        );



    },

});




