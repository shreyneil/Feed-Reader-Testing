/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be running against the application.
 */

$(function() {
    /* This is the first test suite - a test suite just containing
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is the first test, it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL defined and they are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name defined and they are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* This test suite is named as "The menu" */
    describe('The menu', function() {
        /* This test ensures that the menu element is
         * hidden by default.Analyzing the HTML and
         * the CSS will help in determining performance of the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            // ref: https://api.jquery.com/hasclass/
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations i.e. the menu displays when
          * clicked and hides when clicked again.
          */
         it('toggles visibility on click', function() {
            $('a.menu-icon-link').trigger('click'); // show menu
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click'); // hide menu again
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    /* Test suite is named as "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * The loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Test suite is named as "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldFeed;

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                // store old feed
                oldFeed = $('.feed').html();
                // fetch newer feed
                loadFeed(1, done);
            });
        });

        it('is different from old', function() {
            expect($('.feed').html()).not.toBe(oldFeed);
        });
    });

}());
