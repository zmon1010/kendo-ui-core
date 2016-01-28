kendo_docker Cookbook Description
=====================

Includes recipe(s) for:

1. Installing the Docker and configuring the system to work with it without interfare with rest of the setup
2. Create Dockerfile for the MVC6 demos
3. Build Docker image containing the MVC6 demos
4. Push the image to the Telerik repository at Docker Hub

Requirements
------------
1. Ubuntu linux 14.04 (the recipe configures the Network adapter which currently is implemented for Ubuntu systems only)
2. Chef-solo version v11.

If Docker Cookbook is used (in future):
1. Chef 12+ (tested on v.12.6.0) is required if Docker cookbook code is uncommented
2. Ruby v.2+ (tested on v2.0.0p481), required by the required Chef version above
3. Docker cookbook
4. Compat_resource cookbook, required by the Docker cookbook above

