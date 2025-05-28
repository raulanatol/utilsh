import { describe, it, expect, vi } from 'vitest';
import { Command } from 'commander';
import { helloPlugin } from '../hello';

describe('Hello Plugin', () => {
  it('should print hello world message', () => {
    const program = new Command();
    const consoleSpy = vi.spyOn(console, 'log');
    
    helloPlugin(program);
    
    // Simular la ejecución del comando
    program.parse(['node', 'test', 'hello']);
    
    expect(consoleSpy).toHaveBeenCalledWith('Hello, World!');
  });
}); 