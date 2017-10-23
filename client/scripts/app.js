var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
    this.set('like', !this.get('like') );
    
  }

});


var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // console.log ('init before', this.comparator)
    this.set('comparator', 'title');
    
    this.on('comparator', function (e) {
      console.log (e);
      this.sortByField(this.comparator);
    });
    
    this.on('change', this.sort);
    // this.trigger('toggleLike', this.sort);
    // console.log ('init after', this.comparator)
  },
 
  comparator: 'title',

  sortByField: function(field) { 
    // console.log ('Field', field);
    // console.log ('before', this.comparator);
    // this.set({comparator: field});
    
    // console.log ('test', this.get ('comparator'));
    
    // console.log ('after', this.comparator);
    // this.sort(field);
    
    this.comparator = field;
    this.sort(); /// not sure how to initialize sort?!?!?!?
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here
    this.listenTo (this.model, 'change', this.render);
    // console.log(this.model);
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    this.model.toggleLike();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    this.listenTo (this.collection, 'sort', this.render);
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
