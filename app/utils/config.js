export function getConfig(key) {
  	if (!window) {
    	return null;
  	}

  	return window.Config[key];
}
