def run_specs
  system("clear")
  system("echo RUN AT #{Time.now.strftime('%H:%M:%S')}")
  system("echo ---------------")
  system("node spec/all.js")
end

watch(".*\.js") do
  run_specs
end

run_specs