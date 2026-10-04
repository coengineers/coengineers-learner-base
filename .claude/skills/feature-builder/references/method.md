# Method: building a feature

Read this when you build.

## Shape

Add in this order: stored things (as a new versioned step, on practice data first), the doorway action that reads or writes them (the member comes from the sign-in, never from the request), then the page. Reuse sign-in, profiles and private files. The app's own guide names the folders and the rules about which parts may talk to which.

## Stored things

Every change to how things are kept is a new step that can be repeated safely. Never edit or delete an earlier one. Every table that holds members' details has rules so a member reads only their own, or only what the plan says is shared. Test it as a second member and as a signed-out visitor.

## Photos and files

Files are private to their owner in the base app. Sharing a photo with other members is new work: a separate place for shared photos, small sizes, approved formats only, and a rule that only signed-in members can view them. Say what a member sees while a photo uploads and if it fails.

## Payments and access

The shop sends the app a message when someone buys, cancels or is refunded. Check it really came from the shop, using the shop's own signing or the secret it gives, kept in the secret settings where the app lives. Let the person in once (a repeat message does nothing new) and remove access when the purchase ends. Founding members added by hand: a simple list the founder edits, with who and when. Use a sample message in the shop's published shape. Nobody buys, cancels or refunds anything; the founder only looks at the payment page. Never store card details: the shop holds them.

## Checks

Run the app's checks after every step. Full checks that need a local database may not run in Code on the web: say "Not run" and why. They run when the change is opened for the founder's yes if the app's setup allows it.

## Practice content

Marked "Practice", removed when the real content arrives. Never generate a recipe, plant or member to stand in for a real one.
