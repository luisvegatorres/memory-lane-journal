export type Post = { date?: string; slug: string; number: string; category: string; title: string; summary: string; readTime: string; motif: string; takeaway: string; sections: { heading: string; paragraphs: string[] }[]; sources: { label: string; url: string }[] };
export const posts: Post[] = [
{
  "slug": "from-web-to-native",
  "number": "05",
  "category": "React Native",
  "title": "One watchlist, two interfaces: moving from web to native.",
  "summary": "React Native brings familiar React ideas to mobile screens while an existing API keeps the data shared.",
  "readTime": "4 min read",
  "motif": "native",
  "date": "November 16, 2026",
  "takeaway": "Reuse the data contract and React concepts, then design the interaction for the device.",
  "sections": [
    {
      "heading": "Keep the API, rethink the screen",
      "paragraphs": [
        "A movie watchlist is a useful way to understand multiplatform development. On the web, a reader can add a movie, change its status, or remove it. A mobile app should preserve that useful flow, but it does not need to copy the browser layout pixel for pixel.",
        "ScreenList already separates its React interface from an Express API and MongoDB. A React Native client can use that same API. The database remains behind the server, and both clients exchange movie records through HTTP requests. Adding a mobile interface does not require a second database or exposing the database connection string to the phone."
      ]
    },
    {
      "heading": "Familiar React, different building blocks",
      "paragraphs": [
        "Components, props, state, and effects carry over from React. The interface primitives change: React Native uses components such as View, Text, TextInput, and FlatList instead of HTML elements. A FlatList can render the movie collection, with each record's ID used as a stable key.",
        "Styling also needs attention. StyleSheet creates named JavaScript style objects; it does not load a browser stylesheet. I would keep the watchlist's colors and visual identity while adapting spacing, text size, and controls for a small touch screen. A form must remain usable when the keyboard opens, and content should avoid the device's system areas."
      ]
    },
    {
      "heading": "Make each action a complete round trip",
      "paragraphs": [
        "The mobile app can use GET /api/movies to load records, POST to create a movie, PATCH /api/movies/:id to update it, and DELETE to remove it. The interface should check the response status before treating any operation as successful. A failed HTTP request can still produce a resolved fetch promise.",
        "Separate loading, empty, and error states explain what is happening. During a save, disabling the submit action helps avoid duplicate requests. If it fails, keeping the entered text makes retrying less frustrating. After success, using the record returned by the API keeps the visible state consistent with what was saved."
      ]
    },
    {
      "heading": "Navigation and connectivity are part of the design",
      "paragraphs": [
        "A mobile flow might have a watchlist screen, a movie detail screen, and a form for adding or editing. React Navigation can manage a stack of screens and provide expected back behavior. Passing a movie ID between screens gives the destination a clear way to identify the record it needs.",
        "A phone can lose service while the app is open. Expo Network can report connection state, but a connection alone does not guarantee that the API is reachable. Every request still needs error handling and a useful retry path. For a first version, clearly explaining that a change was not saved is better than implying offline edits will synchronize when no synchronization system exists."
      ]
    },
    {
      "heading": "Test on the device, not only in the browser",
      "paragraphs": [
        "A physical phone needs an API address it can reach. Localhost on the phone points to the phone itself, not the development computer. A deployed HTTPS API avoids that particular mismatch, while server secrets remain in server configuration.",
        "The final check should follow the whole user journey: create a movie, reload the list, edit its status, reopen it, and delete it. Then try invalid input and a lost connection. Test navigation, keyboard behavior, and layout on the intended mobile platforms. Sharing React knowledge makes the transition easier, but a reliable mobile experience still requires deliberate testing."
      ]
    }
  ],
  "sources": [
    {
      "label": "React Native — Core Components and Native Components",
      "url": "https://reactnative.dev/docs/intro-react-native-components"
    },
    {
      "label": "React Native — FlatList",
      "url": "https://reactnative.dev/docs/flatlist"
    },
    {
      "label": "React Native — StyleSheet",
      "url": "https://reactnative.dev/docs/stylesheet"
    },
    {
      "label": "React Navigation — Hello React Navigation",
      "url": "https://reactnavigation.org/docs/hello-react-navigation/"
    },
    {
      "label": "Expo — Network",
      "url": "https://docs.expo.dev/versions/latest/sdk/network/"
    },
    {
      "label": "MDN — Using the Fetch API",
      "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
    }
  ]
},
{
  "slug": "building-a-crud-api",
  "number": "04",
  "category": "APIs",
  "title": "One movie, four operations: building a CRUD API.",
  "summary": "A movie watchlist makes the relationship between a React interface, an Express server, and MongoDB easier to follow.",
  "readTime": "4 min read",
  "motif": "api",
  "date": "November 9, 2026",
  "takeaway": "Define the data and request contract first, then make each interface action follow that contract.",
  "sections": [
    {
      "heading": "Start with one useful record",
      "paragraphs": [
        "A static journal publishes content when the site is built. A watchlist has a different need: someone should be able to add a movie and change its status without rebuilding the website. That is where an API and a database become useful.",
        "For a small movie record, I would start with a title, a genre, and a status such as Planned or Watched. The server should also assign a created_at timestamp. Keeping that timestamp on the server prevents a browser form from deciding when a record was created. MongoDB stores the record, while the API controls which changes are allowed."
      ]
    },
    {
      "heading": "Give each operation an address and method",
      "paragraphs": [
        "CRUD means create, read, update, and delete. For a watchlist, GET /api/movies returns the collection and POST /api/movies creates a record. PATCH /api/movies/:id changes selected fields on an existing movie, while DELETE /api/movies/:id removes it. A GET request to /api/movies/:id can retrieve one movie.",
        "Express matches both the request path and its HTTP method to a handler. That lets the same collection address support reading and creating without confusing the two actions. Keeping API addresses under /api also separates them from browser pages such as /about. An unknown API address should return a JSON error instead of the React page."
      ]
    },
    {
      "heading": "Validate before saving",
      "paragraphs": [
        "A form can catch an empty title before a request is sent, but the server still needs to check it. Requests can come from Postman, another interface, or a script. I would trim text, limit its length, accept only known status values, and reject fields the client is not allowed to change.",
        "Responses should explain what happened. A successful creation can return 201 and the saved movie. Invalid input can return 400; a valid identifier with no matching movie can return 404. A database failure needs an error response too, without exposing connection strings or internal details. These distinctions make debugging more useful than receiving the same generic response for everything."
      ]
    },
    {
      "heading": "Connect the interface carefully",
      "paragraphs": [
        "React can call the API with fetch and render the returned records. A resolved fetch promise does not automatically mean the request succeeded: the code must check response.ok before treating the response as successful. While a save is pending, disabling the submit button helps prevent duplicate requests.",
        "The interface also needs separate loading, empty, and error states. An empty watchlist should invite the user to add a movie; a failed request should offer a retry. After an edit, the screen should use the saved record returned by the server. If a save fails, keeping the entered values lets the user correct or retry the action."
      ]
    },
    {
      "heading": "Test the whole trip",
      "paragraphs": [
        "A useful test sequence is to create a movie, retrieve it, mark it Watched, refresh the page, and finally delete it. The refresh matters because it checks persistence rather than just a change in React state. I would also try an empty title, an unsupported status, a malformed identifier, and a movie that no longer exists.",
        "Before deploying, database credentials belong in server environment variables, never in browser code or the GitHub archive. After deploying, repeat the same CRUD sequence using the public URL. The goal is a complete round trip: an interface action reaches the API, the database changes, and the response produces the correct screen."
      ]
    }
  ],
  "sources": [
    {
      "label": "Express — Routing",
      "url": "https://expressjs.com/en/guide/routing/"
    },
    {
      "label": "MDN — Using the Fetch API",
      "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
    }
  ]
},
  { slug: 'following-a-request', number: '01', category: 'Architecture', title: 'Following a request, from browser to screen.', summary: 'The web feels less mysterious when you follow one request through the systems that make a page appear.', readTime: '3 min read', motif: 'request', takeaway: 'When a page fails, follow the request before changing the code.', sections: [
    { heading: 'Start with the journey', paragraphs: ['A website can look like one finished thing, but several systems cooperate to make it appear. The browser is the client: it asks for resources and turns the responses into a page. A server responds to those requests. Between them sits the network that carries the information.', 'For a typical first visit, the browser needs to locate the host associated with the domain name. DNS helps translate that name into an IP address. The browser can then establish a connection and request the page over HTTP, usually secured with HTTPS. Caching and connection reuse can shorten this journey on later visits.'] },
    { heading: 'The response is only the beginning', paragraphs: ['Receiving HTML is not the same as having a complete page. The browser also needs any linked stylesheets, scripts, and images. It parses the HTML into a document structure and uses CSS to determine how that structure should look. JavaScript can then add behavior, such as filtering a list of journal entries.', 'That separation is useful when debugging. A page with readable text but no styling might have a failed CSS request. A working layout with an unresponsive button points toward a different part of the system. The symptom gives me a place to start, rather than a reason to rewrite everything.'] },
    { heading: 'Turn the architecture into a checklist', paragraphs: ['For a missing blog post, I would first check the requested address. Next, I would inspect the response status in the browser’s Network panel, confirm the expected page exists in the build, and examine any failed asset requests. Only then would I change the rendering code.', 'Thinking in boundaries makes a complicated application more approachable. Client, network, server, and content each have a job. Following one request across those boundaries gives me a repeatable way to ask where the expected behavior stopped.'] }
  ], sources: [{ label: 'MDN — How does the Internet work?', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work' }, { label: 'MDN — Overview of HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' }] },
  { slug: 'a-smaller-stack', number: '02', category: 'Tech stacks', title: 'A smaller stack, with a clearer purpose.', summary: 'Choosing tools starts with what a project needs to do. A simple journal is a good reminder to keep that decision grounded.', readTime: '3 min read', motif: 'stack', takeaway: 'Choose a tool for the responsibility it fills, and keep every responsibility clear.', sections: [
    { heading: 'Give each tool a job', paragraphs: ['A technology stack is the group of tools used to build and run an application. The names matter less than their responsibilities. Something defines the interface, something manages the content, something produces the deployable files, and something serves those files to visitors.', 'For this journal, Next.js supplies routing and the build process, React supplies reusable interface components, and custom CSS gives the pages their visual identity. The posts are structured TypeScript data kept alongside the source. GitHub is intended to hold the version history, while a static host can serve the exported files.'] },
    { heading: 'Match complexity to the problem', paragraphs: ['This site needs a post archive, three article pages, and straightforward navigation. It does not need visitor accounts, payments, or real-time collaboration. A database and an authentication service would introduce more configuration without improving those core requirements.', 'A headless CMS would make sense if several nontechnical editors needed to publish regularly. For a small collection edited with the code, a local content file keeps the workflow understandable. The tradeoff is that publishing a change requires a new build rather than an update through an editorial dashboard.'] },
    { heading: 'Keep room for the next change', paragraphs: ['Simple does not have to mean tangled. Keeping the content separate from the page components lets one article template render every post. If the design changes, I can update that template once. If the content source changes later, the same data shape provides a useful boundary.', 'My preferred question is not “Which stack has the most features?” It is “Can I explain why each piece is here?” For this project, a small stack makes deployment easier to reason about and leaves more attention for readable content, accessible navigation, and a polished layout.'] }
  ], sources: [{ label: 'Next.js — Static exports', url: 'https://nextjs.org/docs/app/guides/static-exports' }, { label: 'React — Your first component', url: 'https://react.dev/learn/your-first-component' }] },
  { slug: 'from-local-to-live', number: '03', category: 'Deployment', title: 'It works locally. Now make it live.', summary: 'A successful build is a milestone. The real test is opening the deployed site and following every path a reader can take.', readTime: '3 min read', motif: 'deploy', takeaway: 'Test the deployed artifact, including direct links—not just the development server.', sections: [
    { heading: 'Build before you publish', paragraphs: ['The development server is designed for quick feedback while writing code. It is not the final artifact that a static host serves. With static export enabled, a Next.js production build generates HTML and supporting assets in an output directory. Those files are what need to reach the host.', 'For this blog, the build also needs to know every article address in advance. Generating those routes from the post collection creates a page for each entry. A missing route can otherwise remain hidden if testing only begins from the home page during development.'] },
    { heading: 'Check the paths a visitor will use', paragraphs: ['After deployment, I would open the home page, visit each article, return to the archive, and use the browser’s Back button. I would also paste an article URL into a new tab and refresh it. That checks whether the host serves individual pages directly rather than relying on an existing browsing session.', 'The page is not finished if its styles or scripts only work on localhost. The browser’s Network and Console panels help reveal broken assets and runtime errors. A narrow viewport is another useful check: headings, navigation, and article text should still fit without horizontal scrolling.'] },
    { heading: 'Make the handoff reproducible', paragraphs: ['Version control connects the published result to its source. Before a handoff, I would confirm that the intended work is pushed to the default branch and that the deployment corresponds to that revision. A lockfile helps another developer install the same dependency versions.', 'A source archive should include the code and configuration, not installed dependencies, build caches, or live secrets. For this assignment, the archive must come directly from GitHub’s default branch, and the repository and live-site links belong in the activity’s Feedback field. Those final checks are part of delivery, not an afterthought.'] }
  ], sources: [{ label: 'Next.js — Static exports', url: 'https://nextjs.org/docs/app/guides/static-exports' }, { label: 'GitHub — Downloading source code archives', url: 'https://docs.github.com/en/repositories/working-with-files/using-files/downloading-source-code-archives' }] }
];
