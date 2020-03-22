# Media Literacy

![](https://repository-images.githubusercontent.com/249002907/34fad200-6bbf-11ea-9efb-efd1b229d552)

## Table of contents

- [About](#about)
- [Features & usage](#features-&-usage)
    - [Layout](#layout)
    - [Icon](#icon)
- [Installation](#installation)
    - [Firefox](#firefox)
- [Contributing](#contributing)
    - [Data corrections](#data-corrections)
    - [New websites](#new-websites)
    - [Code contributions](#code-contributions)
- [To-do list](#to-do-list)
- [Privacy policy](#privacy-policy)
- [License](#license)

## About

Media Literacy is a free and open-source extension for Mozilla Firefox that aims to make it easy for users to check whether the information they're looking at is coming from a trustworthy source by organizing it in a way that's concise, contains clear visual cues, and is nice to look at.

The information presented by Media Literacy is sourced from [Media Bias/Fact Check](https://mediabiasfactcheck.com), the [International Fact Checking Network](https://www.poynter.org/ifcn/), and [Reporters Without Borders](https://rsf.org/en/), although it's been cleaned up, corrected for errors, and organized by myself to make it easier to display in the fashion described above. The sites will be occasionally re-crawled for new data.

Media Bias/Fact Check is a great website that has fully-written reports which analyze each source, explain its specific biases, and list any instances of failed fact checks on that source. You are encouraged to read these reports by clicking the link that appears at the bottom of the extension UI on each website that it recognizes.

That being said, this project is NOT associated with Media Bias/Fact Check. There's an [official extension](https://github.com/JeffreyATW/mbfc_icon) available that's maintained by Jeffrey Carl Faden, but I wanted to make something a bit more modern looking and concise. Media Bias/Fact Check runs ads on their website but absolutely no revenue is diverted to myself or to this project, nor do I intend for it to be. The [privacy policy](#privacy-policy) at the bottom of this document talks more about the transparency and intent of this project.

This extension is currently in beta, so some features may missing/not working or there may be bugs. See below on reporting bugs and contributing.

## Features & usage

### Layout
![](https://i.imgur.com/SNOikQS.png)

1. Name of the publication / website.
1. Tooltips. Hover over these for more details about the specific items shown.
1. Bias rating. This comes from MBFC. Check the "Full analysis on MBFC" link at the bottom of the extenion UI for more information.
1. Factuality of reporting. This is also from MBFC; check the link for details.
1. Country the publication is based in. If there's a gray line underneath, this is a clickable link to a page on MBFC that goes into detail about press freedom in that country.
1. Aforementioned country's ranking on the World Press Freedom Index (2019), provided by Reporters Without Borders. You can find more information [here](https://rsf.org/en/ranking).
1. Link to the report for this outlet on MBFC.

### Icon
![](https://i.imgur.com/zmBDlR9.png)

When switching between tabs, the button's icon will change to let you take a quick look at whether the site you're viewing is trustworthy. 

## Installation
### Firefox
[![](https://i.imgur.com/Z4qX74Q.png)](https://addons.mozilla.org/en-US/firefox/addon/media-literacy/)

## Contributing

### Data corrections

If you find any errors or missing information in the data, please [create an issue on GitHub](https://github.com/fergusch/media-literacy/issues) describing it. The data on MBFC isn't totally consistent and the crawler isn't perfect so there are likely to be some errors, but there's too much data to comb through by hand.
- A lot of websites are especially missing country data. Please create an issue if you find any that are.
- There may also be [new corrections](https://mediabiasfactcheck.com/changes-corrections/) on MBFC that haven't been crawled yet, so feel free to create an issue about those too.

### New websites

If there's a certain media outlet or website you'd like to see represented, I would encorage you to:

1. [Search for it on MBFC](https://mediabiasfactcheck.com/search/). New sources are being added all the time and the data for this extension might fall behind if it hasn't been crawled recently, so there's a chance it's already on there. If this is the case, create an issue on this repo and I'll make sure it gets added.
2. Check MBFC's [sources pending](https://mediabiasfactcheck.com/sources-pending/) list to see if it has been submitted for review. If it's on there, check MBFC regularly to see if it has been posted, and refer to step 1 after it is.
3. [Submit the source to MBFC](https://mediabiasfactcheck.com/submit-source/), then refer to steps 1 and 2.

My intention is for every website to be backed by a full report on MBFC, so only sources that have been added there will be tracked by this extension.

### Code contributions

For bug fixes or improvements, feel free to create an issue or pull request and I'd be happy to take a look. See the to-do list below for things that I'm planning on adding or improving.

## To-do list
- [ ] Crawl / research information about website owners
- [ ] Explicitly label state-run media or propaganda outlets
- [ ] Preferences menu
- [ ] Option to opt-out of automatic data pulling
- [ ] Dark theme
- [ ] Notify the user when they visit a site that fits certain criteria set by them (e.g. questionable source, mixed/low factual reporting, propaganda outlet, etc.)
- [ ] Inject alerts about low-quality or propaganda outlets into Twitter, Facebook, Reddit, etc.
- [ ] Port to Chrome and other browsers
- [ ] Translate into other languages 
    - [ ] Chinese
    - [ ] Spanish
    - [ ] Hindi
    - [ ] Arabic
    - [ ] Japanese
    - (others to be added - feel free to request!)

## Privacy policy

### Remote requests

The only remote requests made by Media Literacy are to fetch the entire block of JSON data which is stored on GitHub and pulled through GitCDN (neither of which this project is affiliated with). Querying of the data is performed locally so no information about your browsing history is ever sent in a remote request.

These requests are done automatically when you visit websites. This ensures the data you're seeing is as up-to-date as possible, because frequent changes to the database are likely. Future updates will allow opting-out of these requests and creating a local copy of the database. When that happens, this privacy policy will be updated accordingly.

### Local storage

If a query of the database returns a result for the website you're visiting, a copy of the data for that specific website is stored in your browser's local storage area (not in a cookie). This means only one query needs to be made per page load. Only data about the website is stored, nothing about the specific page you visited or any actions performed on that page. When you navigate to a different website or close the tab/window/entire browser, the data is erased immediately. This data is never transmitted anywhere or synced to your browser profile via cloud storage.

### Cloud storage

Future updates will allow for preferences to be set for various features. When this happens, you'll be given the option to sync that data via cloud storage (Firefox Sync or a Google account for Chrome). If you choose to opt-in, then your preference data will be synced via one of those services (if they're enabled). Media Literacy does not have a dedicated server so there's nowhere else for this information to be stored remotely.

### Data collection
Media Literacy collects **absolutely no information** about you or your usage of the software, period. As mentioned, none of your browsing data is ever sent in any remote request, and Media Literacy does not have any remote servers to send data to or store it on.

### Transparency
This is an independent personal project and is not backed by any corporation or organization, nor will it ever be. I have absolutely no interest in monetizing this project or accepting donations/funding for it. It exists purely because I believe the information presented should be widely, easily, and quickly accessible to anyone and everyone. The source code and its revision history will always be freely and publicly available on GitHub.

## License
Media Literacy is licensed under the GNU GPLv3 license. See the [LICENSE](https://github.com/fergusch/media-literacy/blob/master/LICENSE) file for details.

