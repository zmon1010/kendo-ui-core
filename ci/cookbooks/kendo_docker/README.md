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
2. Chef-solo version 12+ (tested on v.12.6.0), required by the Compat_resource cookbook
3. Ruby v.2+ (tested on v2.0.0p481), required by the required Chef version above
4. Docker cookbook
5. Compat_resource cookbook, required by the Docker cookbook above

Attributes
----------
TODO: List your cookbook attributes here.

e.g.
#### kendo_docker::default
<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><tt>['kendo_docker']['bacon']</tt></td>
    <td>Boolean</td>
    <td>whether to include bacon</td>
    <td><tt>true</tt></td>
  </tr>
</table>

Usage
-----
#### kendo_docker::default
TODO: Write usage instructions for each cookbook.

e.g.
Just include `kendo_docker` in your node's `run_list`:

```json
{
  "name":"my_node",
  "run_list": [
    "recipe[kendo_docker]"
  ]
}
```
