const app = Vue.createApp({
    data() {
      return {
       
        dropdownOptions: ['Drop Down Option', 'Drop Down Option2', 'Drop Down Option3'],
        selectedDropdown: '',
        currentSlide: 0,
        slides: [
            { title: "Lorem Ipsum1", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit" },

            { title: "Lorem Ipsum 2", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit" },

            { title: "Lorem Ipsum 3", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit" },

            { title: "Lorem Ipsum 4", content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit" },
          ],
          searchWords: ["cars", "racing", "history", "action"], 
          selectedWord: "cars", 
          tvShows: [ 
            {
              name: "Example Show 1",
              type: "Comedy",
              summary: "This is an example summary.",
              url: "#",
              
            },
            {
              name: "Example Show 2",
              type: "Drama",
              summary: "This is another example summary.",
              url: "#",
              
            },
            {
              name: "Example Show 3",
              type: "Action",
              summary: "Yet another example summary.",
              url: "#",
             
            },
          ], 
          
          
        
      };
    },
    created() {
      this.fetchShows(this.selectedWord); 
    },
    methods: {
      submitForm() {
        
       
        console.log('Dropdown Selected:', this.selectedDropdown);
       
        alert('Form submitted successfully!');
      },
       // Section III Methods
       nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      },
      goToSlide(index) {
        this.currentSlide = index;
      },
//sec2
      async fetchShows(word) {
        try {
          const response = await fetch(`http://api.tvmaze.com/search/shows?q=${word}`);
          // const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.tvmaze.com/search/shows?q=${word}`);
          const data = await response.json();
          this.tvShows = data.slice(0, 3).map((item) => ({
            name: item.show.name,
            type: item.show.type || "Unknown",
            summary: item.show.summary || "No description available.",
            url: item.show.officialSite || item.show.url || "#",
          }));
        } catch (error) {
          console.error(`Error fetching shows for ${word}:`, error);
          this.tvShows = [];
        }
      },

    },
  });

  app.mount('#app');