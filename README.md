# IoC to KQL (IoC2KQL)

## 1. What?

IOC2KQL is a simple tool to convert a list of IoCs into KQL tables to shave a few seconds of work when IoC threat hunting.
This is designed to make large queries on tables quicker (e.g. a `has_any` over a list of 100 domains to see if any URLs in `DeviceNetworkEvents` appears).

## 2. Where?

Here! [https://tbliki.github.io/IoC2KQL/](https://tbliki.github.io/IOC2KQL/)

## 3. Why?

I am lazy, I like automation, and I do not want to type every quote around every IoC every time.
Yes, this can be done immediately with LLMs, but I prefer a 'dumb' version that doesn't take more computing power than it has to.

## 4. How?

It's a simple tool, so it runs on a very simple HTML/CSS/JS.
Keep it simple, stupid!