x Rewrite URLs for old APIs
x Rate limiting
x Compare to Arches
x API key authentication

Out of scope: JWTs for authentication

List features
Logs to volumes (maybe)

====================================

# NGINX as API gateway

## General - NGINX

* Open source 
* Lighweight
* High performance parallel processing
* Reverse proxy, load balancer and web server for existing HTTP traffic in one
* Run more than one website on a single machine
* HTTP and HTTPS
* Highly configurable - but takes time to learn
* Configuration can be layered in using configuration files which can be included to other configuration files using an 'include' directive
* Flexible logging features

## API gateway

The primary function of an API gateway is to provide a single, consistent entry point for multiple APIs, regardless of how they are implemented or deployed at the backend.

Regular traffic can be separated from traffic intended for the APIs, separating behaviour expected of the API gateway from that expected for regular browser-based traffic.

Each API can have separate configuration files in NGINX. These can be included from higher level configuration files using the "include" directive which can make use of  wildcards to read in many files at once. This allows a breading down the configurations into manageable chunks and automating their inclusion.

Each API can be load-balanced simply by listing more server addresses in the API's configuration file. NGINX will forward requests to these each server in the list by using a round-robin algorithm. 

### Error handling

When NGINX is deployed as an API gateway, we can configure it to return errors in  a way that best suits the API clients: 

* Error responses can be provided in an API friendly JSON format
* Invalid paths can be treated as bad requests (e.g. 400) instead, for instance, a 404 (Not Found) error
* We can require the API clients to make requests only to the valid URIs included in the API and prevent unauthorized clients from discovering the URI structure of the APIs
* We can intercept errors coming from the APIs and not pass them on to the API client if we wish so
    * Unhandled exceptions may contain stack traces or other sensitive data that we don’t want to send to the client.

## Microservices orchestration

An API gateway is particularly useful when an API is developed as a collection of microservices, each running on different ports and/or IP addresses. Resources/services can be implemented as separate services and deployed to different back ends. The API gateway can publish these as a single API. 

## Change management

When API services undergo changes, for instance if they are relocated or a resource or an URL is renamed, the API gateway can handle the changes by directing traffic differently without a need for the API client to know about it. This can be handled via URL re-writes.

## Security policy

NGINX offers several approaches for protecting APIs and authenticating API clients, such as:

* IP address‑based access control lists (ACLs)
* Digital certificate authentication
* HTTP Basic authentication
* API keys
* JSON Web Tokens (NGINX Plus only)

NAPI definition/routing can be separated from the API's security policy such as rate limiting, authentication and logging. The policy can be defined for each API separately.

Rate limits (HTTP requests allowed per second/minute) can be set differently for each API as well. Also, rates can be set differently for calls which use or do not use API keys. For instance, we could allow higher rates for calls that are sending API keys compared to those that do not.

API keys are commonly used when authenticating request coming from API clients. API keys are a shared secret known by the client and the API gateway, a long and complex password issued to the API client and kept long-term. Th key can be provided by the API client to the API gateway in the header of the request. NGINX will compare the API key to a list of allowed values and block or forward requests accordingly. Note that there is no need to implement key verification in the API services itself.

## API definition - broad of specific

APIs can be defined in NGINX broadly or in a very specific manner. Broad could mean, for example, passing on any URL starting with "x". A specific definition would only allow proxying if URL that are an exact match or match a specific pattern

If the only consideration is proxying each request to the correct backend service, the broad approach provides the fastest processing and most compact configuration.

A more specific definition has the advantage of protecting the backend services from malformed client requests, at the cost of some small additional overhead for regular expression matching.