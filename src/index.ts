#!/usr/bin/env node
import { Runner } from './core/Runner.js';

const runner = new Runner();
runner.run().catch(console.error);
