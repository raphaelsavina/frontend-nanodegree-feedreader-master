/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Some Ajax calls takes more than the deault 5s so
     * we need to give Jasmine more time: 20 seconds.
     */
    var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds for tests:
         *  test_url() and test_name()
         */
        for (var x = 0; x < allFeeds.length; x++) {
            test_url(x);
            test_name(x);
        }

        /* Test that feed url is defined
         * and that the URL is not empty.
         */
        function test_url(feedID) {
            it('Feed ' + allFeeds[feedID].name + ' has an URL that is defined', function() {
                expect(allFeeds[feedID].url).toBeDefined();
                expect(allFeeds[feedID].url.length).not.toBe(0);
            });
        }

        /* Test that feed name is defined
         * and that the name is not empty.
         */
        function test_name(feedID) {
            it('Feed ' + allFeeds[feedID].name + ' has a name that is defined', function() {
                expect(allFeeds[feedID].name).toBeDefined();
                expect(allFeeds[feedID].name.length).not.toBe(0);
            });
        }

    });

    /* Test suite for the menu */
    describe('The menu', function() {

        /* Test that ensures the menu element is hidden by default.
         * Using jasmine.jquery to help (https://github.com/velesin/jasmine-jquery)
         */
        it('is hidden by default', function() {
            expect($('body')).toHaveClass('menu-hidden');
        });

        /* Test that ensures the menu changes visibility
         * when the menu icon is clicked. This has two expectations:
         * does the menu display when clicked and does it hide when clicked again.
         */
        it('click display/hide menu', function() {
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass('menu-hidden');
            $('.menu-icon-link').click();
            expect($('body')).toHaveClass('menu-hidden');
        });

    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed function is called
         * and completed its work, there is at least a single .entry
         * element within the .feed container. loadFeed() is asynchronous
         * so it uses Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed() is working', function() {
            expect($('.feed')).not.toBeEmpty();
            expect($('.entry')).toExist();
        });

    });

    /* Test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* Set feed ID as variable for easy change.
         * 1 (CSS tricks), seems too slow for call back so start
         * at 2 (HTML Rocks)
         */
        var n = 2,
            oldContent,
            newContent;

        /* Test that ensures when a new feed is loaded
         * by loadFeed() that the content actually changes.
         * loadFeed() is asynchronous, so it uses Jasmine's beforeEach
         * and asynchronous done() function.
         */
        beforeEach(function(done) {
            /* Get the content for feed(n) */
            loadFeed(n, function() {
                oldContent = $('.feed').text();
                /* Display on console to check */
                console.log(oldContent);
                /* Get the content for feed(n+1) */
                loadFeed(n+1, function() {
                    newContent = $('.feed').text();
                    /* Display on console to check */
                    console.log(newContent);
                    /* All feeds received, call done() */
                    done();
                });
            });
        });

        it('a new feed is loaded', function() {
            expect(newContent).not.toBe(oldContent);
        });

        afterEach(function() {
            /* reset Jasmine's timeout to default value */
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

    });

}());
