case node["platform"]
when "ubuntu"
    bash "install modulus command-line utility" do
        code "npm install -g modulus"
        action :run
        not_if "which modulus"
    end
end
