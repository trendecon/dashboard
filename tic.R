get_stage("install") %>%
  add_step(step_install_cran("dataseries")) %>%
  add_step(step_install_cran("dygraphs")) %>%
  add_step(step_install_cran("flexdashboard")) %>%
  add_step(step_install_cran("htmlwidgets")) %>%
  add_step(step_install_cran("knitr")) %>%
  add_step(step_install_cran("timetk")) %>%
  add_step(step_install_cran("tsbox"))

get_stage("before_deploy") %>%
  add_step(step_setup_ssh()) %>%
  add_step(step_setup_push_deploy())

get_stage("deploy") %>%
  add_code_step(rmarkdown::render("docs/index.Rmd")) %>%
  add_step(step_do_push_deploy(commit_paths = "docs/index.html"))
