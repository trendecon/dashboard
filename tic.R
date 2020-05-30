get_stage("install") %>%
  add_step(step_install_github("dataseries")) %>%
  add_step(step_install_github("timetk")) %>%
  add_step(step_install_github("flexdashboard"))

get_stage("before_deploy") %>%
  add_step(step_setup_ssh()) %>%
  add_step(step_setup_push_deploy())

get_stage("deploy") %>%
  add_code_step(rmarkdown::render("docs/index.Rmd")) %>%
  add_step(step_do_push_deploy(commit_paths = "docs/index.html"))